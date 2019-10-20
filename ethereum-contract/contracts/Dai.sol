pragma solidity 0.5.8;

contract Dai {
    
    // -- ERC20 --
    string private constant name = "Dai";
    string private constant symbol = "DAI";
    string private constant version = "1";
    uint8 private constant decimals = 18;
    uint256 private totalSupply;
    mapping (address => uint) public balanceOf;
    event Transfer(address indexed src, address indexed dst, uint wad);

    // -- Math --
    
    function add(uint x, uint y) internal pure returns (uint z) {
        require((z = x + y) >= x);
    }

    function sub(uint x, uint y) internal pure returns (uint z) {
        require((z = x - y) <= x);
    }

    function transfer(address dst, uint wad) external returns (bool) {
        return transferFrom(msg.sender, dst, wad);
    }

    function transferFrom(address src, address dst, uint wad) public returns (bool) {
        // require
        balanceOf[src] = sub(balanceOf[src], wad);
        balanceOf[dst] = add(balanceOf[dst], wad);
        emit Transfer(src, dst, wad);
        return true;
    }
}