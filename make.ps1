function Log {
    param (
        $Message
    )
    Write-Host $Message -ForegroundColor yellow -BackgroundColor black
    Write-Host " "
}

Log "Building BASE Widget..."

npm run build

$SiteURL = "URL"
$FilesPathA = "C:\Repos\BASE-Widget\dist\css"
$FilesPathB = "C:\Repos\BASE-Widget\dist\js"
$ServerRelativePathA = "/SiteAssets/css"
$ServerRelativePathB = "/SiteAssets/js"

Connect-PnPOnline -Url $SiteURL -Interactive -Verbose

$Files = Get-ChildItem -Path $FilesPathA -Force -Recurse

ForEach ($File in $Files) {
    Write-host "Uploading $($File.Directory)\$($File.Name)"
    Add-PnPFile -Path "$($File.Directory)\$($File.Name)" -Folder $ServerRelativePathA -Values @{"Title" = $($File.Name) }
}

$Files = Get-ChildItem -Path $FilesPathB -Force -Recurse

ForEach ($File in $Files) {
    Write-host "Uploading $($File.Directory)\$($File.Name)"
    Add-PnPFile -Path "$($File.Directory)\$($File.Name)" -Folder $ServerRelativePathB -Values @{"Title" = $($File.Name) }
}

Log "Done. Clearing Screen in 15 seconds..."
Start-Sleep -Seconds 15
Clear-Host
$today = Get-Date
Write-Host -f Green "Project Built and Uploaded: `t$today"
