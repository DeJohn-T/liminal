/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cakeproject;


public class Cake {
    
    // Data Members
    public String flavor;
    public int tiers;
    public double price;

    public Cake(String flavor, int tiers, double price) {
        this.flavor = flavor;
        this.tiers = tiers;
        this.price = price;
    }
    
    public String getInfo()
    {
        return String.format("A %d tier %s cake will cost you approximately: $%f \n", tiers, flavor, price);
    }
    
    
}
