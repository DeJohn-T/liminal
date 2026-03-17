package Graph;

import java.io.*;
import java.lang.*;
import java.util.*;

class Vertex
{
    String code;
    int dvalue = 2401;
    Edge parentedge = null;
    ArrayList<Edge> adjlist;

    public Vertex(String code){
        this.code = code;
        adjlist = new ArrayList<Edge>();
    }
}
class Edge
{
    int depttime, arrtime;
    Vertex origin, dest;
    String airline, flno;

    public Edge(String airline, String flno, Vertex origin, Vertex dest, int depttime, int arrtime) {
        this.airline = airline;
        this.flno = flno;
        this.origin = origin;
        this.dest = dest;
        this.depttime = depttime;
        this.arrtime = arrtime;
    }
}
public class graph
{

    static HashMap<String, Vertex> vmap = new HashMap<String, Vertex>();
    static ArrayList<Edge> elist = new ArrayList<Edge>();
    static PriorityQueue<Vertex> heap = new PriorityQueue<Vertex>
            ((v1, v2) -> v1.dvalue - v2.dvalue);



    public static void main(String[] args) throws FileNotFoundException {

        Vertex v;
        Edge e;
        int i, begintime;

        //step 1: read airport.txt file and set up vertices in vlist, heap
        Scanner scanner = new Scanner(new File("airports.txt"));
        scanner.nextLine(); //skip first line
        String code;

        while (scanner.hasNext()) {
            code = scanner.nextLine();
            v = new Vertex(code);
            vmap.put(code,v);
            heap.add(v);
        }
        //step 2: read flights.txt and add the edges to respective adjacency lists
        scanner = new Scanner(new File("flights.txt"));
        scanner.nextLine(); scanner.nextLine(); //skip two lines

        String line = scanner.nextLine();
        while (scanner.hasNext()) {
            String[] fields = line.split("\\s+");
            e = new Edge(fields[0], fields[1], getvertex(fields[2]), getvertex(fields[3]), Integer.parseInt(fields[4]),Integer.parseInt(fields[5]));
            elist.add(e);
            v = e.origin;
            v.adjlist.add(e);

            line = scanner.nextLine();
        }
        long startTime = System.nanoTime();
        //Step 3: Execute dijkstra's algorithm
        int arrivalTime = dijkstra(args[0],args[1], Integer.parseInt(args[2]));
        System.out.println(arrivalTime);
        //printpath(args[1]); //comment out this line out for gradescope submission

    }

    static void printpath(String code) {

        Edge e = getvertex(code).parentedge;
        if (e == null) return;
        printpath(e.origin.code);
        System.out.println(e.airline+"\t"+e.flno+"\t"+e.origin.code+"\t"+e.dest.code+"\t"+e.depttime+"\t"+e.arrtime);
    }

    static Vertex getvertex(String code){
        return vmap.get(code);
    }
    static Vertex extractmin() {
        return heap.poll();

    }

    static void relax(Edge e, Vertex u) {
        Vertex v = e.dest;
        // Ensure the flight can be taken based on previous arrival time and minimum wait time
        if (e.depttime >= u.dvalue) {
            int newTime = e.arrtime; // New potential arrival time at v via u

            if (newTime < v.dvalue) {
                v.dvalue = newTime;
                v.parentedge = e;
                decreasekey(v, newTime); // Ensure the heap is updated with the new earliest time
            }
        }
    }
    static void decreasekey(Vertex v, int newTime) {
        // Remove the vertex from the priority queue
        heap.remove(v);
        // Update the earliest arrival time
        v.dvalue = newTime;
        // Reinsert the vertex with the updated arrival time
        heap.add(v);
    }

    static int dijkstra(String src, String sink, int starttime) {
        Vertex s = getvertex(src);
        s.dvalue = starttime;
        heap.add(s); // Start with the source vertex in the heap

        while (!heap.isEmpty()) {
            Vertex u = extractmin();
            if (u.code.equals(sink)) {
                return u.dvalue; // Return the earliest arrival time at the destination
            }

            for (Edge e : u.adjlist) {
                if (e.depttime >= u.dvalue) { // Only consider valid onward flights
                    relax(e, u);
                }
            }
        }

        return -1; // No path found
    }



}