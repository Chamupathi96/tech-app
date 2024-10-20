package backend.tech_app.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.tech_app.model.OrderModel;


@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Long>  {
    
   
    
}
