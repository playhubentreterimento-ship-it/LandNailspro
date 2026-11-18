Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\LG\.gemini\antigravity\brain\a136a0f7-ea53-4943-830a-0d8559303b4d\.user_uploaded\media_1794973652380_e571e45b.jpg"
$destDir = "C:\Users\LG\.gemini\antigravity\scratch\nailgestao-pro\public\comparativo"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $bmp.Width
$h = $bmp.Height

Write-Host "Total: $w x $h"

# In media_1794973652380_e571e45b.jpg:
# Left card is roughly from x = 20 to x = 500, y = 20 to y = 490
# Let's save both exact half crops and tightly bounded card crops:

# 1. Exact half crop (0..512)
$rectHalfL = New-Object System.Drawing.Rectangle(0, 0, 512, 512)
$bmpHalfL = $bmp.Clone($rectHalfL, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$bmpHalfL.Save((Join-Path $destDir "rotina-manual.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmpHalfL.Dispose()

# 2. Exact half crop (512..1024)
$rectHalfR = New-Object System.Drawing.Rectangle(512, 0, 512, 512)
$bmpHalfR = $bmp.Clone($rectHalfR, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$bmpHalfR.Save((Join-Path $destDir "rotina-nailgestao.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmpHalfR.Dispose()

# 3. Precise card crop Left (excluding outer transparent/pink margin):
# The cards have rounded corners and start at around x = 24, y = 46, width = 480, height = 420
# Let's inspect some pixel colors to find the exact card margins:
$sampleBg = $bmp.GetPixel(10, 10)
Write-Host "Top-left bg color: R=$($sampleBg.R), G=$($sampleBg.G), B=$($sampleBg.B)"

$cardTop = 0
for ($y = 0; $y -lt 150; $y++) {
    $p = $bmp.GetPixel(256, $y)
    # Check when color changes significantly from bg
    if ([Math]::Abs($p.R - $sampleBg.R) -gt 25 -or [Math]::Abs($p.G - $sampleBg.G) -gt 25) {
        $cardTop = $y
        break
    }
}
Write-Host "Card top border at y = $cardTop"

$bmp.Dispose()
