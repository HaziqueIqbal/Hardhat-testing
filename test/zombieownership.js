const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Zombie Factory Contract", () => {
    
    it("Should return all the things related to zombie", async function () {
        const [owner] = await ethers.getSigners();
        const Zombie = await ethers.getContractFactory("ZombieOwnership");
        const zombie = await Zombie.deploy();

        const setZombie = await zombie.createRandomZombie("Hazique");
        await setZombie.wait();
        const ownerOf = await zombie.ownerOf(0);
        expect(owner.address).to.equal(ownerOf);
        console.log(`Owner is : ${ownerOf}`); 
        const [name,dna,level,readyTime,winCount,lossCount] = await zombie.zombies(0);
        console.log(`Name of Zombie: ${name}`);
        console.log(`Zombie DNA: ${Number(dna)}`);
        console.log(`Zombie level: ${level}`);
        console.log(`Zombie readyTime: ${readyTime}`);
        console.log(`Win Count: ${winCount}`);
        console.log(`Loss Count: ${lossCount}`);

        // expect(name).to.equal("Hazque");

        expect(name).to.equal("Hazique");
        
    });

});

describe("Zombie Owner validation", () => {
    it("Should validate owner", async function () {
        const Zombie = await ethers.getContractFactory("ZombieOwnership");
        const zombie = await Zombie.deploy();

        const isOwner = await zombie.isOwner();
        console.log(`Checking : ${isOwner}`);
    });
});
