import Foundation
import Vision
import AppKit
import CoreImage
let args = CommandLine.arguments
guard args.count >= 3, let ci = CIImage(contentsOf: URL(fileURLWithPath: args[1])) else { print("usage: personmask in out.png"); exit(1) }
let req = VNGeneratePersonSegmentationRequest()
req.qualityLevel = .accurate
req.outputPixelFormat = kCVPixelFormatType_OneComponent8
let handler = VNImageRequestHandler(ciImage: ci, options: [:])
try handler.perform([req])
guard let res = req.results?.first else { print("geen resultaat"); exit(1) }
let m = CIImage(cvPixelBuffer: res.pixelBuffer)
let sx = ci.extent.width / m.extent.width, sy = ci.extent.height / m.extent.height
let scaled = m.transformed(by: CGAffineTransform(scaleX: sx, y: sy))
let ctx = CIContext()
guard let cg = ctx.createCGImage(scaled, from: CGRect(origin: .zero, size: ci.extent.size)) else { print("render faalt"); exit(1) }
let rep = NSBitmapImageRep(cgImage: cg)
try rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: args[2]))
print("ok mask \(Int(m.extent.width))x\(Int(m.extent.height)) -> \(cg.width)x\(cg.height)")
