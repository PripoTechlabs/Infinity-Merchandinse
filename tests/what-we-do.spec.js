// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('What We Do section', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Scroll the section into view to trigger IntersectionObserver
        await page.evaluate(() => {
            const section = document.getElementById('what-we-do');
            if (section) section.scrollIntoView({ behavior: 'instant' });
        });
        // Wait for cards to fly in
        await page.waitForFunction(() => {
            const cards = document.querySelectorAll('#what-we-do .rt-card-wrapper');
            return Array.from(cards).some(c => c.classList.contains('im-pillar-visible'));
        }, { timeout: 5000 });
    });

    test('section renders', async ({ page }) => {
        const section = page.locator('#what-we-do');
        await expect(section).toBeVisible();
    });

    test('center circle is visible', async ({ page }) => {
        const circle = page.locator('#what-we-do .rt-main-circle-wrapper');
        await expect(circle).toBeVisible();
    });

    test('SVG progress arc injected into circle', async ({ page }) => {
        const arc = page.locator('#what-we-do .im-pillar-arc-svg');
        await expect(arc).toBeAttached();
    });

    test('cards fly in — all get im-pillar-visible', async ({ page }) => {
        // Wait for all 6 cards
        await page.waitForFunction(() => {
            const cards = document.querySelectorAll('#what-we-do .rt-card-wrapper');
            return Array.from(cards).every(c => c.classList.contains('im-pillar-visible'));
        }, { timeout: 8000 });

        const cards = page.locator('#what-we-do .rt-card-wrapper');
        const count = await cards.count();
        expect(count).toBe(6);

        for (let i = 0; i < count; i++) {
            await expect(cards.nth(i)).toHaveClass(/im-pillar-visible/);
        }
    });

    test('at least one pillar text is visible in circle', async ({ page }) => {
        // Wait for text cycling to activate
        await page.waitForFunction(() => {
            return !!document.querySelector('#what-we-do .im-pillar-text-active');
        }, { timeout: 5000 });

        const activeText = page.locator('#what-we-do .im-pillar-text-active');
        await expect(activeText).toBeVisible();
    });

    test('pillar text cycles — different text active after 3s', async ({ page }) => {
        await page.waitForFunction(() => !!document.querySelector('#what-we-do .im-pillar-text-active'), { timeout: 5000 });

        const getActiveText = () =>
            page.evaluate(() => {
                const el = document.querySelector('#what-we-do .im-pillar-text-active');
                return el ? el.className : null;
            });

        const first = await getActiveText();
        await page.waitForTimeout(3500);
        const second = await getActiveText();

        expect(first).not.toBeNull();
        expect(second).not.toBeNull();
        expect(first).not.toBe(second);
    });

    test('auto-cycle highlights cards — im-pillar-active appears', async ({ page }) => {
        await page.waitForFunction(() => {
            return !!document.querySelector('#what-we-do .rt-card-wrapper.im-pillar-active');
        }, { timeout: 8000 });

        const active = page.locator('#what-we-do .rt-card-wrapper.im-pillar-active');
        await expect(active).toHaveCount(1);
    });

    test('auto-cycle advances — different card active after 1.8s', async ({ page }) => {
        const getActiveIndex = () =>
            page.evaluate(() => {
                const cards = Array.from(document.querySelectorAll('#what-we-do .rt-card-wrapper'));
                return cards.findIndex(c => c.classList.contains('im-pillar-active'));
            });

        await page.waitForFunction(() => {
            return document.querySelectorAll('#what-we-do .rt-card-wrapper.im-pillar-active').length === 1;
        }, { timeout: 8000 });

        const first = await getActiveIndex();
        await page.waitForTimeout(2200);
        const second = await getActiveIndex();

        expect(first).toBeGreaterThanOrEqual(0);
        expect(second).toBeGreaterThanOrEqual(0);
        expect(first).not.toBe(second);
    });

    test('SVG arc progresses as cards are visited', async ({ page }) => {
        const getOffset = () =>
            page.evaluate(() => {
                const arc = document.querySelector('#what-we-do .im-pillar-arc-svg circle:last-child');
                return arc ? parseFloat(arc.getAttribute('stroke-dashoffset') || '1000') : 1000;
            });

        // Initial offset — full circumference (arc empty)
        const initial = await getOffset();

        // Wait for auto-cycle to visit some cards
        await page.waitForTimeout(5000);
        const later = await getOffset();

        expect(later).toBeLessThan(initial);
    });

    test('hovering a card darkens it immediately', async ({ page }) => {
        const cards = page.locator('#what-we-do .rt-card-wrapper');
        // Hover the 3rd card — applyDarkCard sets inline background-color: #000
        await cards.nth(2).hover();

        await expect(cards.nth(2)).toHaveCSS('background-color', 'rgb(0, 0, 0)');
    });

});

test.describe('What We Do — mobile viewport', () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => {
            const section = document.getElementById('what-we-do');
            if (section) section.scrollIntoView({ behavior: 'instant' });
        });
        await page.waitForFunction(() => {
            return !!document.querySelector('#what-we-do .rt-card-wrapper.im-pillar-visible');
        }, { timeout: 5000 });
    });

    test('circle visible at mobile size', async ({ page }) => {
        const circle = page.locator('#what-we-do .rt-main-circle-wrapper');
        await expect(circle).toBeVisible();
        const box = await circle.boundingBox();
        expect(box).not.toBeNull();
        expect(box.width).toBeGreaterThanOrEqual(230);
        expect(box.width).toBeLessThanOrEqual(300);
    });

    test('outer rings hidden on mobile', async ({ page }) => {
        const circleTwo = page.locator('#what-we-do .rt-circle-two');
        const circleThree = page.locator('#what-we-do .rt-circle-three');
        await expect(circleTwo).toBeHidden();
        await expect(circleThree).toBeHidden();
    });

    test('pillar text cycles on mobile', async ({ page }) => {
        await page.waitForFunction(() => !!document.querySelector('#what-we-do .im-pillar-text-active'), { timeout: 5000 });

        const getActive = () =>
            page.evaluate(() => {
                const el = document.querySelector('#what-we-do .im-pillar-text-active');
                return el ? el.className : null;
            });

        const first = await getActive();
        await page.waitForTimeout(3500);
        const second = await getActive();

        expect(first).not.toBeNull();
        expect(second).not.toBeNull();
        expect(first).not.toBe(second);
    });

    test('SVG arc exists on mobile', async ({ page }) => {
        const arc = page.locator('#what-we-do .im-pillar-arc-svg');
        await expect(arc).toBeAttached();
    });

    test('cards auto-cycle on mobile', async ({ page }) => {
        await page.waitForFunction(() => {
            return !!document.querySelector('#what-we-do .rt-card-wrapper.im-pillar-active');
        }, { timeout: 8000 });

        const active = page.locator('#what-we-do .rt-card-wrapper.im-pillar-active');
        await expect(active).toHaveCount(1);
    });

    test('tap a card darkens it on mobile', async ({ page }) => {
        const cards = page.locator('#what-we-do .rt-card-wrapper');
        // touchstart fires applyDarkCard — sets inline background-color: #000
        await cards.nth(1).tap();

        await expect(cards.nth(1)).toHaveCSS('background-color', 'rgb(0, 0, 0)');
    });
});
