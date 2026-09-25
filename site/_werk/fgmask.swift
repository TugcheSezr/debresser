import Foundation
import Vision
import AppKit
import CoreImage
let args = CommandLine.arguments
guard args.count >= 3, let ci = CIImage(contentsOf: URL(fileURLWithPath: args[1])) else { print("usage: fgmask in out-mask.png"); exit(1) }
let req = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: ci, options: [:])
try handler.perform([req])
guard let res = req.results?.first else { print("geen resultaat"); exit(1) }
print("instances: \(res.allInstances.count)")
let pb = try res.generateScaledMaskForImage(forInstances: res.allInstances, from: handler)
let m = CIImage(cvPixelBuffer: pb)
let ctx = CIContext()
guard let cg = ctx.createCGImage(m, from: m.extent) else { print("render faalt"); exit(1) }
let rep = NSBitmapImageRep(cgImage: cg)
try rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: args[2]))
print("ok \(cg.width)x\(cg.height)")
