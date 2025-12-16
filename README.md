# CIDR / VLSM Calculator

A web-based CIDR (Classless Inter-Domain Routing) and VLSM (Variable Length Subnet Mask) calculator that replicates the functionality of the popular subnet-calculator.com tool.

## Features

- **IP Address Input**: Enter any valid IPv4 address
- **Mask Bits Selection**: Choose from 1-32 mask bits
- **Real-time Calculations**: All results update automatically as you type
- **Comprehensive Results**:
  - CIDR Netmask
  - Wildcard Mask
  - Maximum Subnets
  - Maximum Addresses
  - CIDR Network (Route)
  - CIDR Notation
  - CIDR Address Range

## How to Use

1. **Start the server**:
   ```bash
   cd subnetcalc
   python3 -m http.server 8000
   ```

2. **Open in browser**:
   Navigate to `http://localhost:8000`

3. **Enter calculations**:
   - Type an IP address (e.g., `192.168.1.0`)
   - Select mask bits from the dropdown (1-32)
   - View all calculated results instantly

## Technical Details

### Files
- `index.html` - Main HTML structure and interface
- `styles.css` - CSS styling for the calculator
- `script.js` - JavaScript logic for CIDR calculations
- `README.md` - This documentation file

### Calculation Logic

The calculator implements standard CIDR mathematics:

- **Netmask**: Predefined table of subnet masks for each mask bit value
- **Wildcard Mask**: Inverse of the netmask (255 - netmask_octet for each octet)
- **Network Address**: IP address ANDed with netmask
- **Broadcast Address**: Network address ORed with host mask
- **Maximum Subnets**: 2^(32 - mask_bits) for the given prefix length
- **Maximum Addresses**: 2^(32 - mask_bits) - 2 (excluding network and broadcast addresses)

### Validation

- IP address input is validated for proper IPv4 format
- Visual feedback shows valid/invalid IP addresses
- All calculations handle edge cases (including /31 and /32 networks)

## Example Calculations

### 192.168.1.0/24
- **CIDR Netmask**: 255.255.255.0
- **Wildcard Mask**: 0.0.0.255
- **Maximum Subnets**: 256
- **Maximum Addresses**: 254
- **CIDR Network**: 192.168.1.0
- **CIDR Notation**: 192.168.1.0/24
- **CIDR Address Range**: 192.168.1.0 - 192.168.1.255

### 10.0.0.0/16
- **CIDR Netmask**: 255.255.0.0
- **Wildcard Mask**: 0.0.255.255
- **Maximum Subnets**: 65,536
- **Maximum Addresses**: 65,534
- **CIDR Network**: 10.0.0.0
- **CIDR Notation**: 10.0.0.0/16
- **CIDR Address Range**: 10.0.0.0 - 10.0.255.255

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript features
- CSS Grid and Flexbox
- HTML5 input validation

## Contributing

Feel free to submit issues or pull requests to improve the calculator functionality.

## License

This project is for educational purposes. Based on the original subnet-calculator.com functionality.
