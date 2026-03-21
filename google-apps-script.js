// ============================================================
//  Infinity Merchandise — Enquiry Form → Google Sheets
//  Google Apps Script Web App
//
//  SETUP INSTRUCTIONS:
//  1. Open your Google Sheet
//  2. Extensions → Apps Script
//  3. Delete default code, paste this entire file
//  4. Click Save (Ctrl+S)
//  5. Click "Deploy" → "New deployment"
//     - Type: Web app
//     - Execute as: Me
//     - Who has access: Anyone
//  6. Click Deploy → copy the Web App URL
//  7. Paste that URL into js/infinity.js → GSHEET_URL constant
// ============================================================

const SHEET_NAME = 'Enquiries'; // Sheet tab name (created automatically)

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Get or create the Enquiries sheet
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Create header row on first use
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Date & Time (Dubai)',
        'Full Name',
        'Email',
        'Phone / WhatsApp',
        'Company',
        'Country',
        'Role',
        'Product Interests',
        'Order Quantity',
        'Order Frequency',
        'Budget (USD)',
        'Timeline',
        'Source Markets',
        'Delivery Destinations',
        'Services Needed',
        'Message / Requirements',
        'How Heard'
      ];
      sheet.appendRow(headers);

      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0B2641');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);

      // Auto-resize columns
      sheet.autoResizeColumns(1, headers.length);
    }

    // Parse submitted JSON data
    const data = JSON.parse(e.postData.contents);
    const now = new Date();

    // Append data row
    sheet.appendRow([
      Utilities.formatDate(now, 'Asia/Dubai', 'dd/MM/yyyy HH:mm:ss'),
      data.name            || '',
      data.email           || '',
      data.phone           || '',
      data.company         || '',
      data.country         || '',
      data.role            || '',
      data.product_interests || '',
      data.quantity        || '',
      data.frequency       || '',
      data.budget          || '',
      data.timeline        || '',
      data.source_markets  || '',
      data.destinations    || '',
      data.services_needed || '',
      data.message         || '',
      data.how_heard       || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health-check endpoint (GET request test)
function doGet() {
  return ContentService
    .createTextOutput('Infinity Merchandise Enquiry Endpoint — OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
