package backend.tech_app.service;

import java.util.List;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.tech_app.model.OrderModel;
import backend.tech_app.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public OrderModel placeOrder(OrderModel order) {
        order.setOrderDate(LocalDate.now());
        order.setStatus("Pending");
        return orderRepository.save(order); // Save order to the database
    }

    public List<OrderModel> getAllOrders() {
        return orderRepository.findAll(); // Retrieve all orders
    }

   
    
}
