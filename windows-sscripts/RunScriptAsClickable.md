# Run PowerShell Scripts by Double-Clicking

To run `.ps1` (PowerShell script) files by double-clicking on them, follow the steps below.

**Note**: This process involves editing the Windows Registry. Improper changes can harm your system. Always backup the registry before making modifications.

## 1. Backup Your Registry

- Press `Win + R`, type `regedit`, and press `Enter`.
- In the Registry Editor, click on `File` > `Export`.
- Choose a location and name for the backup file, then click `Save`.

## 2. Modify the Registry

- Navigate to:
  `HKEY_CLASSES_ROOT\Microsoft.PowerShellScript.1\Shell`

- Right-click on `Shell`, hover over `New`, and select `Key`. Name this new key `Run with PowerShell`.
- Right-click on the `Run with PowerShell` key, hover over `New`, and select `Key`. Name this new key `Command`.
- In the right pane, double-click the `(Default)` value.
- Set its value data to:
  `"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" "-Command" "if((Get-ExecutionPolicy ) -ne 'AllSigned') { Set-ExecutionPolicy -Scope Process Bypass }; & '%1'"`

## 3. Apply the Changes

- Close the Registry Editor.
- Now, right-clicking a `.ps1` file will show an `Run with PowerShell` option. Double-clicking the file will also execute it with PowerShell.

## 4. Set Execution Policy

PowerShell doesn't run scripts by default for security reasons. Adjust the execution policy to allow scripts:

- Open PowerShell as an administrator.
- Enter:

```powershell
Set-ExecutionPolicy RemoteSigned
```
