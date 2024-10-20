package backend.tech_app.model;

import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Getter
@Setter
@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long itemId; // ID of the item ordered
    private int quantity; // Quantity of the item
    private String itemName;
    private String category;

    public OrderItem() {
    }

    public OrderItem(Long itemId, int quantity, String itemName, String category) {
        this.itemId = itemId;
        this.quantity = quantity;
        this.itemName = itemName;
        this.category = category;
    }
    
}
