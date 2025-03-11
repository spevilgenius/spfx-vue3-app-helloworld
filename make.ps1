function Log {
    param (
        $Message
    )
    Write-Host $Message -ForegroundColor yellow -BackgroundColor black
    Write-Host " "
}

Log "Building BASE Widget..."

npm run build

$SiteURL = "https://legodan.sharepoint.com/sites/LegoTeam"
$FilesPathA = "D:\Repos\spfx-vue3-app-helloworld\dist\css"
$FilesPathB = "D:\Repos\spfx-vue3-app-helloworld\dist\js"
$ServerRelativePathA = "/sites/LegoTeam/SiteAssets/css"
$ServerRelativePathB = "/sites/LegoTeam/SiteAssets/js"

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

Log "Done."
<# Log "Clearing Screen in 15 seconds..."
Start-Sleep -Seconds 15
Clear-Host #>
$today = Get-Date
Write-Host -f Green "Project Built and Uploaded: `t$today"
