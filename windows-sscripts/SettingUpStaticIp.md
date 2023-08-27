## PowerShell Commands

### Get the current network configuration

```
>> Get-NetIPConfiguration
```

## **Network Interface Details:**

- **Interface Alias**: Wi-Fi 2
- **Interface Index**: 6
- **Description**: Realtek 8812BU Wireless LAN 802.11ac USB NIC
- **Network Profile Name**: BELL152
- **IPv4 Address**: `192.168.2.42`
- **IPv6 Default Gateway**: (None specified)
- **IPv4 Default Gateway**: `192.168.2.1`
- **DNS Servers**:
  - `192.168.2.1`
  - `207.164.234.193`

```
198.168.2.200 => new desired static IP
192.168.2.1 => Current DNS server

>> New-NetIPAddress -InterfaceIndex $interfaceIndex -IPAddress 192.168.2.200 -PrefixLength 24 -DefaultGateway 192.168.2.1
>> Set-DnsClientServerAddress -InterfaceIndex 6 -ServerAddresses 192.168.2.1
```
