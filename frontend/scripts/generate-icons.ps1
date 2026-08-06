Add-Type -AssemblyName System.Drawing

$iconsDir = Join-Path $PWD "public\icons"
if (-not (Test-Path $iconsDir)) { New-Item -ItemType Directory -Path $iconsDir | Out-Null }

function Add-ArchPath {
  param($Path, [single]$X, [single]$Y, [single]$W, [single]$H)
  $arcD = $W
  $Path.AddLine($X, $Y + $H, $X, $Y + $arcD / 2)
  $Path.AddArc($X, $Y, $arcD, $arcD, 180, 180)
  $Path.AddLine($X + $W, $Y + $arcD / 2, $X + $W, $Y + $H)
  $Path.CloseFigure()
}

function New-WeddingIcon {
  param([int]$Size, [string]$Out, [bool]$Maskable = $false)

  $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

  $rect = New-Object System.Drawing.Rectangle(0, 0, $Size, $Size)

  # Deep emerald background with a soft gold glow behind the arch
  $bgTop = [System.Drawing.ColorTranslator]::FromHtml("#164734")
  $bgBottom = [System.Drawing.ColorTranslator]::FromHtml("#0b2a20")
  $bgGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $bgTop, $bgBottom, 90.0)
  $g.FillRectangle($bgGrad, $rect)

  $glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
  $glowD = $Size * 0.92
  $glowPath.AddEllipse([single](($Size - $glowD) / 2), [single](($Size - $glowD) / 2), [single]$glowD, [single]$glowD)
  $glowBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
  $glowBrush.CenterColor = [System.Drawing.Color]::FromArgb(90, 227, 181, 74)
  $glowBrush.SurroundColors = [System.Drawing.Color[]]@([System.Drawing.Color]::FromArgb(0, 0, 0, 0))
  $g.FillRectangle($glowBrush, $rect)

  # Arch geometry (proportions kept across sizes)
  $archScale = if ($Maskable) { 0.7 } else { 0.86 }
  $aW = $Size * $archScale
  $aH = $Size * $archScale * 1.18
  $aX = ($Size - $aW) / 2
  $aY = ($Size - $aH) / 2

  $goldLight = [System.Drawing.ColorTranslator]::FromHtml("#f0d48a")
  $goldMid = [System.Drawing.ColorTranslator]::FromHtml("#d4a03c")
  $goldDark = [System.Drawing.ColorTranslator]::FromHtml("#a97918")

  # Outer arch fill (gold gradient)
  $archRectF = New-Object System.Drawing.RectangleF([single]$aX, [single]$aY, [single]$aW, [single]$aH)
  $archGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($archRectF, $goldLight, $goldDark, 90.0)
  $outer = New-Object System.Drawing.Drawing2D.GraphicsPath
  Add-ArchPath -Path $outer -X ([single]$aX) -Y ([single]$aY) -W ([single]$aW) -H ([single]$aH)
  $g.FillPath($archGrad, $outer)

  # Inner arch (cream/ink panel)
  $inPad = $Size * 0.055
  $innerW = $aW - 2 * $inPad
  $innerH = $aH - 2 * $inPad
  $innerX = $aX + $inPad
  $innerY = $aY + $inPad
  $inner = New-Object System.Drawing.Drawing2D.GraphicsPath
  Add-ArchPath -Path $inner -X ([single]$innerX) -Y ([single]$innerY) -W ([single]$innerW) -H ([single]$innerH)
  $innerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(28, 255, 255, 255))
  $g.FillPath($innerBrush, $inner)

  # Arch outline strokes
  $strokePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 240, 212, 138), [math]::Max(2, $Size * 0.008))
  $g.DrawPath($strokePen, $outer)

  # Gold heart
  $heartSize = $innerW * 0.42
  $font = New-Object System.Drawing.Font("Segoe UI Symbol", [single]($heartSize * 1.3), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $heartBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 243, 196))
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $heartRect = New-Object System.Drawing.RectangleF -ArgumentList @(
    [single]($innerX - $innerW * 0.5),
    [single]($innerY + $innerH * 0.18),
    [single]($innerW * 2),
    [single]($innerH * 0.5)
  )
  $g.DrawString([string][char]0x2665, $font, $heartBrush, $heartRect, $sf)

  # Diamond accent below the heart
  $dia = $innerW * 0.09
  $diaX = $Size / 2 - $dia / 2
  $diaY = $aY + $aH * 0.66
  $diaPath = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diaPath.AddLine([single]$diaX, [single]$diaY, [single]($diaX + $dia / 2), [single]($diaY + $dia * 0.5))
  $diaPath.AddLine([single]($diaX + $dia / 2), [single]($diaY + $dia * 0.5), [single]$diaX, [single]($diaY + $dia))
  $diaPath.AddLine([single]$diaX, [single]($diaY + $dia), [single]($diaX - $dia / 2), [single]($diaY + $dia * 0.5))
  $diaPath.CloseFigure()
  $g.FillPath($heartBrush, $diaPath)

  # Sparkle dots beside the arch
  $dotBrush = New-Object System.Drawing.SolidBrush($goldLight)
  $dotR = [math]::Max(2, $Size * 0.012)
  $g.FillEllipse($dotBrush, [single]($aX - $Size * 0.045 - $dotR), [single]($aY + $Size * 0.28 - $dotR), [single]($dotR * 2), [single]($dotR * 2))
  $g.FillEllipse($dotBrush, [single]($aX + $aW + $Size * 0.03 - $dotR), [single]($aY + $Size * 0.28 - $dotR), [single]($dotR * 2), [single]($dotR * 2))

  $g.Dispose()
  $bmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Output "created $Out"
}

New-WeddingIcon -Size 512 -Out (Join-Path $iconsDir "icon-512.png")
New-WeddingIcon -Size 192 -Out (Join-Path $iconsDir "icon-192.png")
New-WeddingIcon -Size 512 -Out (Join-Path $iconsDir "maskable-512.png") -Maskable $true
New-WeddingIcon -Size 180 -Out (Join-Path $iconsDir "apple-touch-icon.png")
