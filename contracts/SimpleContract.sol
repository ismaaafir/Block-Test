// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract SimpleContract {
int public storageValue;

function setValue ( int _newValue) public {
    storageValue = _newValue;
 }

function getValue () public view returns ( int ){
    return storageValue;
 }
}