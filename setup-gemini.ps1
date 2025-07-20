# Setup script for Gemini CLI
# Run this script to configure your Gemini API key

# 1. Make sure the .gemini directory exists
$geminiDir = "$env:USERPROFILE\.gemini"
if (!(Test-Path $geminiDir)) {
    New-Item -Path $geminiDir -ItemType Directory -Force
    Write-Host "Created .gemini directory at $geminiDir"
}

# 2. Create the settings.json file
$settingsContent = @{
    auth = @{
        method  = "api_key"
        api_key = "$env:GEMINI_API_KEY"
    }
} | ConvertTo-Json -Depth 3

$settingsPath = "$geminiDir\settings.json"
$settingsContent | Out-File -FilePath $settingsPath -Encoding UTF8
Write-Host "Created settings file at $settingsPath"

Write-Host ""
Write-Host "IMPORTANT: You need to:"
Write-Host "1. Get your API key from https://aistudio.google.com/apikey"
Write-Host "2. Edit the file $settingsPath"
Write-Host "3. Replace 'your-actual-api-key-here' with your actual API key"
Write-Host ""
Write-Host "Alternatively, you can set the environment variable:"
Write-Host "`$env:GEMINI_API_KEY='your-actual-api-key-here'"
