import Foundation
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("usage: towebp <quality 0-1> <file.png> [...]\n".data(using: .utf8)!)
    exit(2)
}
let quality = Double(args[1]) ?? 0.82
let files = Array(args.dropFirst(2))

let webpType = UTType("org.webmproject.webp") ?? UTType(filenameExtension: "webp")
guard let webp = webpType else {
    FileHandle.standardError.write("webp UTI unavailable\n".data(using: .utf8)!)
    exit(3)
}

for path in files {
    let url = URL(fileURLWithPath: path)
    guard let src = CGImageSourceCreateWithURL(url as CFURL, nil),
          let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else {
        FileHandle.standardError.write("read fail: \(path)\n".data(using: .utf8)!)
        continue
    }
    let outURL = url.deletingPathExtension().appendingPathExtension("webp")
    guard let dest = CGImageDestinationCreateWithURL(outURL as CFURL, webp.identifier as CFString, 1, nil) else {
        FileHandle.standardError.write("dest fail: \(outURL.path)\n".data(using: .utf8)!)
        continue
    }
    let opts: [CFString: Any] = [kCGImageDestinationLossyCompressionQuality: quality]
    CGImageDestinationAddImage(dest, img, opts as CFDictionary)
    if !CGImageDestinationFinalize(dest) {
        FileHandle.standardError.write("encode fail: \(outURL.path)\n".data(using: .utf8)!)
        continue
    }
    let inSize = (try? FileManager.default.attributesOfItem(atPath: path)[.size] as? Int) ?? 0
    let outSize = (try? FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as? Int) ?? 0
    print("\(url.lastPathComponent) \(inSize) -> \(outURL.lastPathComponent) \(outSize)")
}
