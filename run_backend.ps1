$mavenUrl = "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip"
$zipPath = "C:\Users\KARUNA S S\CloudSim7G\maven.zip"
$extractPath = "C:\Users\KARUNA S S\CloudSim7G\maven"

Write-Host "Checking for Maven..."
if (-not (Test-Path $extractPath)) {
    Write-Host "Downloading Maven..."
    Invoke-WebRequest -Uri $mavenUrl -OutFile $zipPath
    Write-Host "Extracting Maven..."
    Expand-Archive -Path $zipPath -DestinationPath $extractPath
    Remove-Item $zipPath
    Write-Host "Maven ready."
} else {
    Write-Host "Maven already downloaded."
}

# Set JAVA_HOME to the downloaded JDK 26
$env:JAVA_HOME = "C:\Users\KARUNA S S\CloudSim7G\oracleJdk-26"

# Add Maven and Java 26 to the PATH for this session
$env:Path = "$env:JAVA_HOME\bin;$extractPath\apache-maven-3.9.6\bin;" + $env:Path

$mvnCmd = "$extractPath\apache-maven-3.9.6\bin\mvn.cmd"

# Verify versions
Write-Host "Using Java:"
java -version
Write-Host "Using Maven:"
& $mvnCmd -version

# Navigate to backend and run
cd "C:\Users\KARUNA S S\CloudSim7G\cloudsim7g-project\backend"
Write-Host "Building project..."
& $mvnCmd clean install -DskipTests

Write-Host "Starting Spring Boot..."
& $mvnCmd spring-boot:run
