param(
    [Parameter(Mandatory = $true)]
    [string]$Message
)

# Stop execution if any command fails
$ErrorActionPreference = "Stop"

git add .
git commit -m "$Message"
git push