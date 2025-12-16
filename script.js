// CIDR Calculator Logic

// Netmask values for different mask bits (0-32)
const NETMASKS = [
    "0.0.0.0",        // 0
    "128.0.0.0",      // 1
    "192.0.0.0",      // 2
    "224.0.0.0",      // 3
    "240.0.0.0",      // 4
    "248.0.0.0",      // 5
    "252.0.0.0",      // 6
    "254.0.0.0",      // 7
    "255.0.0.0",      // 8
    "255.128.0.0",    // 9
    "255.192.0.0",    // 10
    "255.224.0.0",    // 11
    "255.240.0.0",    // 12
    "255.248.0.0",    // 13
    "255.252.0.0",    // 14
    "255.254.0.0",    // 15
    "255.255.0.0",    // 16
    "255.255.128.0",  // 17
    "255.255.192.0",  // 18
    "255.255.224.0",  // 19
    "255.255.240.0",  // 20
    "255.255.248.0",  // 21
    "255.255.252.0",  // 22
    "255.255.254.0",  // 23
    "255.255.255.0",  // 24
    "255.255.255.128", // 25
    "255.255.255.192", // 26
    "255.255.255.224", // 27
    "255.255.255.240", // 28
    "255.255.255.248", // 29
    "255.255.255.252", // 30
    "255.255.255.254", // 31
    "255.255.255.255"  // 32
];

// Maximum subnets for different mask bits
const MAX_SUBNETS = [
    2147483648,  // 0
    1073741824,  // 1
    536870912,   // 2
    268435456,   // 3
    134217728,   // 4
    67108864,    // 5
    33554432,    // 6
    16777216,    // 7
    8388608,     // 8
    4194304,     // 9
    2097152,     // 10
    1048576,     // 11
    524288,      // 12
    262144,      // 13
    131072,      // 14
    65536,       // 15
    32768,       // 16
    16384,       // 17
    8192,        // 18
    4096,        // 19
    2048,        // 20
    1024,        // 21
    512,         // 22
    256,         // 23
    128,         // 24
    64,          // 25
    32,          // 26
    16,          // 27
    8,           // 28
    4,           // 29
    2,           // 30
    1,           // 31
    1            // 32
];

// Maximum addresses for different mask bits
const MAX_ADDRESSES = [
    2147483646,  // 0
    1073741822,  // 1
    536870910,   // 2
    268435454,   // 3
    134217726,   // 4
    67108862,    // 5
    33554430,    // 6
    16777214,    // 7
    8388606,     // 8
    4194302,     // 9
    2097150,     // 10
    1048574,     // 11
    524286,      // 12
    262142,      // 13
    131070,      // 14
    65534,       // 15
    32766,       // 16
    16382,       // 17
    8190,        // 18
    4094,        // 19
    2046,        // 20
    1022,        // 21
    510,         // 22
    254,         // 23
    126,         // 24
    62,          // 25
    30,          // 26
    14,          // 27
    6,           // 28
    2,           // 29
    0,           // 30 (point-to-point)
    0,           // 31 (point-to-point)
    0            // 32 (host route)
];

// Utility functions
function ipToNumber(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

function numberToIp(num) {
    return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
}

function isValidIP(ip) {
    const parts = ip.split('.');
    if (parts.length !== 4) return false;

    return parts.every(part => {
        const num = parseInt(part);
        return num >= 0 && num <= 255 && part === num.toString();
    });
}

function calculateWildcardMask(netmask) {
    const netmaskParts = netmask.split('.').map(Number);
    const wildcardParts = netmaskParts.map(part => 255 - part);
    return wildcardParts.join('.');
}

function calculateNetworkAddress(ip, netmask) {
    const ipNum = ipToNumber(ip);
    const maskNum = ipToNumber(netmask);
    const networkNum = ipNum & maskNum;
    return numberToIp(networkNum);
}

function calculateBroadcastAddress(ip, maskBits) {
    const ipNum = ipToNumber(ip);
    const hostBits = 32 - maskBits;
    const hostMask = (1 << hostBits) - 1;
    const broadcastNum = ipNum | hostMask;
    return numberToIp(broadcastNum);
}

function calculateCIDR(ip, maskBits) {
    const validationMessage = document.getElementById('ip-validation-message');

    // Always show mask-related calculations (they don't depend on IP)
    const netmask = NETMASKS[maskBits];
    const wildcardMask = calculateWildcardMask(netmask);
    document.getElementById('cidr-netmask').textContent = netmask;
    document.getElementById('wildcard-mask').textContent = wildcardMask;
    document.getElementById('max-subnets').textContent = MAX_SUBNETS[maskBits].toLocaleString();
    document.getElementById('max-addresses').textContent = MAX_ADDRESSES[maskBits].toLocaleString();

    if (!isValidIP(ip)) {
        // Show validation message for invalid IP
        if (ip.trim() === '') {
            validationMessage.textContent = '';
            validationMessage.className = 'validation-message';
        } else {
            validationMessage.textContent = 'Please enter a valid IP address (e.g. 192.168.1.0)';
            validationMessage.className = 'validation-message error';
        }

        // Clear IP-dependent results
        document.getElementById('cidr-network').textContent = '-';
        document.getElementById('cidr-notation').textContent = '-';
        document.getElementById('cidr-range').textContent = '-';
        return;
    }

    // Clear any error message and show success
    validationMessage.textContent = '✓ Valid IP address';
    validationMessage.className = 'validation-message success';

    const networkAddress = calculateNetworkAddress(ip, netmask);
    const broadcastAddress = calculateBroadcastAddress(ip, maskBits);

    // Update IP-dependent results
    document.getElementById('cidr-network').textContent = networkAddress;
    document.getElementById('cidr-notation').textContent = `${networkAddress}/${maskBits}`;
    document.getElementById('cidr-range').textContent = `${networkAddress} - ${broadcastAddress}`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const ipInput = document.getElementById('ip-address');
    const maskBitsSelect = document.getElementById('mask-bits');

    // Calculate on page load
    calculateCIDR(ipInput.value, parseInt(maskBitsSelect.value));

    // Add event listeners for input changes
    ipInput.addEventListener('input', function() {
        calculateCIDR(this.value, parseInt(maskBitsSelect.value));
    });

    maskBitsSelect.addEventListener('change', function() {
        calculateCIDR(ipInput.value, parseInt(this.value));
    });

    // Add input validation styling
    ipInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#ddd';
        } else if (!isValidIP(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#27ae60';
        }
    });

    ipInput.addEventListener('focus', function() {
        this.style.borderColor = '#3498db';
    });
});
