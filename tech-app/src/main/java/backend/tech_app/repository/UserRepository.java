package backend.tech_app.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.tech_app.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel,Integer> {

    Optional<UserModel> findByEmail(String email);
}
