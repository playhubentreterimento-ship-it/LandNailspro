Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\LG\.gemini\antigravity\brain\a136a0f7-ea53-4943-830a-0d8559303b4d\.user_uploaded\media_1794973652380_e571e45b.jpg"
$destDir = "C:\Users\LG\.gemini\antigravity\scratch\nailgestao-pro\public\comparativo"

if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
}

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $bmp.Width
$h = $bmp.Height

Write-Host "Source image dimensions: Width = $w, Height = $h"

# In media_1794973652380_e571e45b.jpg, there is a left card and a right card.
# Let's inspect the split: exactly half is $w / 2
$halfW = [int]($w / 2)

# Left image: Rotina Manual
$rectLeft = New-Object System.Drawing.Rectangle(0, 0, $halfW, $h)
$bmpLeft = $bmp.Clone($rectLeft, $bmp.PixelFormat)
$leftPath = Join-Path $destDir "rotina-manual.jpg"
$bmpLeft.Save($leftPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmpLeft.Dispose()
Write-Host "Saved left image to $leftPath"

# Right image: Com NailGestao
$rectRight = New-Object System.Drawing.Rectangle($halfW, 0, ($w - $halfW), $h)
$bmpRight = $bmp.Clone($rectRight, $bmp.PixelFormat)
$rightPath = Join-Path $destDir "rotina-nailgestao.jpg"
$bmpRight.Save($rightPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmpRight.Dispose()
Write-Host "Saved right image to $rightPath"

# Also save the full image for high-res comparison
$fullPath = Join-Path $destDir "comparativo-completo.jpg"
Copy-Item -Path $srcPath -Destination $fullPath -Force
Write-Host "Saved full image to $fullPath"

$bmp.Dispose()
