# Project: Ferrum Web Unified API Documentation: Authentication & File Management
This comprehensive API documentation provides a single source of truth for managing user authentication and file operations. It details endpoints for user signup, login, and profile retrieval alongside endpoints for uploading, fetching, and downloading files. Designed for clarity and ease-of-use, the documentation includes request/response examples, parameter descriptions, and error handling guidelines to help developers integrate seamlessly with our services.

> **Base URL:**  
**`https://ferrum-web.onrender.com`** 
  

###### All endpoints described in this document should be appended to the above URL.

###### For example, if an endpoint is `/auth/login`, the full URL will be:

`https://ferrum-web.onrender.com/auth/login`

## End-point: /auth/me
Retrieves details of the currently authenticated user by verifying the **JWT token** provided in the Authorization header.
### Method: GET
>```
>https://ferrum-web.onrender.com/auth/me
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsInVzZXJuYW1lIjoiZXhhbXBsZXVzZXIiLCJpYXQiOjE3NDM0OTg0NzksImV4cCI6MTc0MzUwMjA3OX0.FurqpxZTcY4ZjS2QS_VN-GVlO9JYOTLZvh8QlWfYab8|


### Headers

|Content-Type|Value|
|---|---|
|x-api-key|test_IrwBXrIbb5TkmAjSEzD5nOYTQTjmhkZvUuoyGyXBPyKERgCLqnt8WylgvwMXZxFX|


### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 200
```json
{
    "id": 33,
    "username": "exampleuser",
    "email": "example@gmail.com"
}
```

### Response: 403
```json
{
    "message": "Invalid token. Access denied."
}
```

### Response: 401
```json
{
    "message": "Token is required"
}
```

### Response: 404
```json
{
    "message": "User not found"
}
```

### Response: 400
```json
{
    "message": "Invalid user ID in token"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /auth/login
Authenticates a user using either their email or username along with a password. On success, returns a **JWT token** and the **username**.
### Method: POST
>```
>https://ferrum-web.onrender.com/auth/login
>```
### Headers

|Content-Type|Value|
|---|---|
|x-api-key|test_IrwBXrIbb5TkmAjSEzD5nOYTQTjmhkZvUuoyGyXBPyKERgCLqnt8WylgvwMXZxFX|


### Body formdata

|Param|value|Type|
|---|---|---|
|email_username|exampleuser|text|
|password|exampleuser1234|text|


### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 200
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInVzZXJuYW1lIjoiZXhhbXBsZXVzZXIiLCJpYXQiOjE3NDM0OTY5ODcsImV4cCI6MTc0MzUwMDU4N30.pylJuufJzZM-Wh0wwO57KDzPQXSSGUQgjMGLwholjbE",
    "username": "exampleuser"
}
```

### Response: 400
```json
Invalid password
```

### Response: 400
```json
User not found
```

### Response: 400
```json
Bad Request: Missing email_username or password.
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /auth/refresh
generates a **new access token** using a **refresh token** stored in cookies.
### Method: POST
>```
>https://ferrum-web.onrender.com/auth/refresh
>```
### Headers

|Content-Type|Value|
|---|---|
|x-api-key|test_IrwBXrIbb5TkmAjSEzD5nOYTQTjmhkZvUuoyGyXBPyKERgCLqnt8WylgvwMXZxFX|


### Headers

|Content-Type|Value|
|---|---|
|Cookie|jwt|


### Headers

|Content-Type|Value|
|---|---|
|||


### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 200
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsInVzZXJuYW1lIjoiZXhhbXBsZXVzZXIiLCJpYXQiOjE3NDM1MDE0ODUsImV4cCI6MTc0MzUwNTA4NX0.eIKAQZ49-LftrJDRV-o4o0gvH6gyxIgMReGXhM_37WY"
}
```

### Response: 406
```json
{
    "message": "Unauthorized"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /auth/signup
Registers a new user. The endpoint accepts the user’s email, username, and password. The password is hashed before storing it in the database.
### Method: POST
>```
>https://ferrum-web.onrender.com/auth/signup
>```
### Headers

|Content-Type|Value|
|---|---|
|x-api-key|test_IrwBXrIbb5TkmAjSEzD5nOYTQTjmhkZvUuoyGyXBPyKERgCLqnt8WylgvwMXZxFX|


### Body formdata

|Param|value|Type|
|---|---|---|
|email|example@gmail.com|text|
|username|exampleuser|text|
|password|exampleuser1234|text|


### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 201
```json
User created successfully
```

### Response: 400
```json
Email is already in use
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /files/fetch
Retrieves metadata for all files associated with a specific user.
### Method: GET
>```
>https://ferrum-web.onrender.com/files/fetch?user=exampleuser
>```
### Headers

|Content-Type|Value|
|---|---|
|x-api-key|test_IrwBXrIbb5TkmAjSEzD5nOYTQTjmhkZvUuoyGyXBPyKERgCLqnt8WylgvwMXZxFX|


### Query Params

|Param|value|
|---|---|
|user|exampleuser|


### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 200
```json
{
    "success": true,
    "files": [
        {
            "fileid": "1741891621805-example.json",
            "filename": "example.json",
            "path": "backend/uploads/1741891621805-example.json",
            "mimetype": "application/json",
            "uploaddate": "2025-03-13T18:47:02.423Z"
        },
        {
            "fileid": "1741892025276-example.json",
            "filename": "example.json",
            "path": "backend/uploads/1741892025276-example.json",
            "mimetype": "application/json",
            "uploaddate": "2025-03-13T18:53:46.973Z"
        },
        {
            "fileid": "fileuploader/kt2laocafoh0eh0zcjzc",
            "filename": "example.json",
            "path": "https://res.cloudinary.com/dqs88lmp0/raw/upload/v1743498223/fileuploader/kt2laocafoh0eh0zcjzc",
            "mimetype": "application/json",
            "uploaddate": "2025-04-01T09:03:43.879Z"
        }
    ]
}
```

### Response: 400
```json
{
    "message": "User ID is required"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /files/upload
Uploads a **JSON** file and associates it with a user. If no user is provided, the file is uploaded with a default "**Guest**" user

_Note: Only files with a_ `.json` _extension and matching MIME type (\`__**application/json**__\`_) are allowed.
### Method: POST
>```
>https://ferrum-web.onrender.com/files/upload
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|multipart/form-data|


### Headers

|Content-Type|Value|
|---|---|
|x-api-key|test_IrwBXrIbb5TkmAjSEzD5nOYTQTjmhkZvUuoyGyXBPyKERgCLqnt8WylgvwMXZxFX|


### Body formdata

|Param|value|Type|
|---|---|---|
|file|/C:/Users/Aniket/OneDrive/Desktop/example.json|file|
|user|exampleuser|text|


### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 200
```json
{
    "success": true,
    "message": "File uploaded successfully"
}
```

### Response: 400
```json
{
    "message": "No File Detected"
}
```

### Response: 500
```json
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Error</title>
    </head>
    <body>
        <pre>Internal Server Error</pre>
    </body>
</html>
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /files/use
Downloads a file based on its file ID. This endpoint returns the file with proper headers so that it can be downloaded or displayed by the client.
### Method: GET
>```
>https://ferrum-web.onrender.com/files/use?fileid=fileuploader/jzxfvs7jsppzc
>```
### Headers

|Content-Type|Value|
|---|---|
|x-api-key|test_IrwBXrIbb5TkmAjSEzD5nOYTQTjmhkZvUuoyGyXBPyKERgCLqnt8WylgvwMXZxFX|


### Query Params

|Param|value|
|---|---|
|fileid|fileuploader/jzxfvs7jsppzc|


### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 200
```json
{"Storage":{"\\\\.\\PHYSICALDRIVE0":{"Caption":"TOSHIBA DT01ACA100","Model":"TOSHIBA DT01ACA100","Size":"1000202273280","FirmwareRevision":"MS2OA750","SerialNumber":"776VH3UNS","Partitions":"1","Status":"OK","InterfaceType":"IDE","PNPDeviceID":"SCSI\\DISK&VEN_TOSHIBA&PROD_DT01ACA100\\5&BC4E48B&0&000000"},"\\\\.\\PHYSICALDRIVE1":{"Caption":"TOSHIBA MQ01ABD100","Model":"TOSHIBA MQ01ABD100","Size":"1000202273280","FirmwareRevision":"AX1P6E","SerialNumber":"Y6HAPKH1T","Partitions":"1","Status":"OK","InterfaceType":"IDE","PNPDeviceID":"SCSI\\DISK&VEN_TOSHIBA&PROD_MQ01ABD100\\5&BC4E48B&0&020000"},"\\\\.\\PHYSICALDRIVE2":{"Caption":"Samsung SSD 980 500GB","Model":"Samsung SSD 980 500GB","Size":"500105249280","FirmwareRevision":"3B4QFXO7","SerialNumber":"0025_38D7_21A3_C3C1.","Partitions":"3","Status":"OK","InterfaceType":"SCSI","PNPDeviceID":"SCSI\\DISK&VEN_NVME&PROD_SAMSUNG_SSD_980\\5&15BB7AC4&0&000000"}},"HardwareID":"AMD Ryzen 5 5600G with Radeon Graphics\/178BFBFF00A50F00\/B550M AORUS ELITE\/Y6HAPKH1T776VH3UNS0025_38D7_21A3_C3C1.","BIOS":{"Name":"FDd","Caption":"FDd","Manufacturer":"American Megatrends International, LLC.","ReleaseDate":"25-12-2023 05:30:00 AM","SMBIOSPResent":"True","Status":"OK","Version":"ALASKA - 1072009","CurrentLanguage":"en|US|iso8859-1","SMBIOSBIOSVersion":"FDd"},"Memory":{"Physical Memory 0":{"Name":"Physical Memory","Manufacturer":"Unknown","Model":"","OtherIdentifyingInfo":"","PartNumber":"CMK8GX4M1E3200C16","Tag":"Physical Memory 0","FormFactor":"8","BankLabel":"P0 CHANNEL A","Capacity":"8589934592","DataWidth":"64","Speed":"3200","ConfiguredClockSpeed":"3200","DeviceLocator":"DIMM 0","SerialNumber":"00000000"},"Physical Memory 2":{"Name":"Physical Memory","Manufacturer":"Unknown","Model":"","OtherIdentifyingInfo":"","PartNumber":"CMK8GX4M1E3200C16","Tag":"Physical Memory 2","FormFactor":"8","BankLabel":"P0 CHANNEL B","Capacity":"8589934592","DataWidth":"64","Speed":"3200","ConfiguredClockSpeed":"3200","DeviceLocator":"DIMM 0","SerialNumber":"00000000"}},"Network":{"13":{"Name":"Realtek PCIe GbE Family Controller #2","Description":"Realtek PCIe GbE Family Controller","PNPDeviceID":"PCI\\VEN_10EC&DEV_8168&SUBSYS_E0001458&REV_15\\C84CB73C5674000000","MACAddress":"74:56:3C:B7:4C:C8","Installed":"True","NetEnabled":"True","NetConnectionID":"Ethernet 2","PhysicalAdapter":"True","TimeOfLastReset":"24-11-2024 08:40:57 AM"},"4":{"Name":"VirtualBox Host-Only Ethernet Adapter","Description":"VirtualBox Host-Only Ethernet Adapter","PNPDeviceID":"ROOT\\NET\\0000","MACAddress":"0A:00:27:00:00:0E","Installed":"True","NetEnabled":"True","NetConnectionID":"Ethernet 3","PhysicalAdapter":"True","TimeOfLastReset":"24-11-2024 08:40:57 AM"}},"CPU":{"CPU0":{"Name":"AMD Ryzen 5 5600G with Radeon Graphics","NumberOfCores":"6","ThreadCount":"12","NumberOfLogicalProcessors":"12","Manufacturer":"AuthenticAMD","AddressWidth":"64","L2CacheSize":"3072","L3CacheSize":"16384","MaxClockSpeed":"3901","ExtClock":"100","SocketDesignation":"AM4","Version":"Model 0, Stepping 0","Caption":"AMD64 Family 25 Model 80 Stepping 0","Family":"107","Stepping":"0","VirtualizationFirmwareEnabled":"True","ProcessorID":"178BFBFF00A50F00"}},"Operating System":{"Microsoft Windows 11 Education|C:\\Windows|\\Device\\Harddisk2\\Partition3":{"Caption":"Microsoft Windows 11 Education","InstallDate":"08-12-2023 01:41:45 PM","CSName":"EGG-PC","LastBootUpTime":"24-11-2024 08:40:57 AM","LocalDateTime":"07-12-2024 10:21:49 AM","Distributed":"False","NumberOfUsers":"2","Version":"10.0.22631","BootDevice":"\\Device\\HarddiskVolume3","BuildNumber":"22631","BuildType":"Multiprocessor Free","Manufacturer":"Microsoft Corporation","OSArchitecture":"64-bit","MUILanguages":"{en-US}","PortableOperatingSystem":"False","Primary":"True","RegisteredUser":"Windows User","SerialNumber":"00328-00000-00000-AA490","ServicePackMajorVersion":"0","ServicePackMinorVersion":"0","SystemDirectory":"C:\\Windows\\system32","SystemDrive":"C:","WindowsDirectory":"C:\\Windows"}},"GPU":{"VideoController1":{"Name":"NVIDIA GeForce GTX 1050 Ti","PNPDeviceID":"PCI\\VEN_10DE&DEV_1C82&SUBSYS_A45419DA&REV_A1\\4&1C5D7D4&0&0009","CurrentBitsPerPixel":"32","CurrentHorizontalResolution":"1366","CurrentVerticalResolution":"768","CurrentRefreshRate":"75","MaxRefreshRate":"75","MinRefreshRate":"50","AdapterDACType":"Integrated RAMDAC","AdapterRAM":"4293918720","DriverDate":"15-10-2024 05:30:00 AM","DriverVersion":"32.0.15.6603","VideoProcessor":"NVIDIA GeForce GTX 1050 Ti"}},"Mainboard":{"Manufacturer":"Gigabyte Technology Co., Ltd.","Model":"","Product":"B550M AORUS ELITE","SerialNumber":"Default string","Version":"x.x","PNPDeviceID":"ACPI\\PNP0C01\\C8"}}
```

### Response: 404
```json
{
    "message": "File not found"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
