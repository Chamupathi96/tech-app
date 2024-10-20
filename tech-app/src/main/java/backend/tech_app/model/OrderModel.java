package backend.tech_app.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List; // Import the correct List class from java.util
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class OrderModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String zipcode;
    private String phone;
    private String status;
  

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id") // Foreign key in items table
    private List<OrderItem> items; // List of items in this order

    private double totalAmount; // Total amount for the order

    private LocalDate orderDate;
    

    

    public OrderModel() {
    }

    public OrderModel(String name, String address, String zipcode, String phone, List<OrderItem> items, double totalAmount,LocalDate orderDate, String status) {
        this.name = name;
        this.address = address;
        this.zipcode = zipcode;
        this.phone = phone;
       
        this.status = status;
        this.items = items;
        this.totalAmount = totalAmount;
        this.orderDate = orderDate;
        
    }
}