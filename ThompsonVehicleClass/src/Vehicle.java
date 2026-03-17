/*
 * DeJohn Thompson
 * Vehicle Class Project
 * Create vehicle object, and call distance. Clearly Labeled outputs.
 * March 1st
 */





public class Vehicle {

    private String make;
    private String model;
    private int tankSize;

    public Vehicle(String make, String model, int tankSize) {
        this.make = make;
        this.model = model;
        this.tankSize = tankSize;
    }

    public String getMake() {
        return make;
    }

    public String getModel() {
        return model;
    }

    public int getTankSize() {
        return tankSize;
    }

    public void distance() {
        double townDistance = tankSize * 25.0;
        double highwayDistance = tankSize * 38.5;

        System.out.printf("Distance in town: %.3f miles%n", townDistance);
        System.out.printf("Distance on highway: %.3f miles%n", highwayDistance);
    }
}

