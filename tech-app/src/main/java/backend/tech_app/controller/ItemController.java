package backend.tech_app.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import backend.tech_app.model.ItemModel;
import backend.tech_app.service.ItemService;



@RestController
@RequestMapping("/api/item")
@CrossOrigin(origins = "http://localhost:5174")
public class ItemController {
    
     private static String uploadDir =  "tech-app/src/main/resources/static/uploads";

    @Autowired
    private ItemService itemService;

    @PostMapping("/add")
    public String addItem(
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam("price") double price,
        @RequestParam("category") String category,
        @RequestParam("image") MultipartFile image
    ) {
        try {
            String imageUrl = saveImage(image); // Save image and get its URL
            ItemModel item = new ItemModel(name, description, price, category, imageUrl);
            itemService.addItem(item);
            return "{\"success\": true, \"message\": \"Item added successfully!\"}";
        } catch (Exception e) {
            return "{\"success\": false, \"message\": \"" + e.getMessage() + "\"}";
        }
    }
        @GetMapping("/list")
        public ResponseEntity<List<ItemModel>> getItems() {
        List<ItemModel> items = itemService.getAllItems();
         return ResponseEntity.ok(items); // Return items in response entity
}

    private String saveImage(MultipartFile image) throws IOException {
        // Define the uploads directory path
        Path uploadPath = Paths.get(uploadDir);
        
        // Ensure that the uploads directory exists
        if (!Files.exists(uploadPath)) {
            throw new IOException("Upload directory does not exist");
        }
        
        // Define the file path to save the image
        Path filePath = uploadPath.resolve(image.getOriginalFilename());
        
        // Check if the file already exists to avoid overwriting (optional)
        if (Files.exists(filePath)) {
            throw new IOException("File already exists: " + image.getOriginalFilename());
        }
        
        // Write the image to the specified path
        Files.write(filePath, image.getBytes());
        
        // Return the relative path to access the image
        return "/uploads/" + image.getOriginalFilename(); // Return image URL
    }

    @DeleteMapping("/delete/{id}")
    public String deleteItem(@PathVariable Long id) {
        try {
            itemService.deleteItem(id); // Call the service method to delete the item and its image
            return "{\"success\": true, \"message\": \"Item and image deleted successfully!\"}";
        } catch (IOException e) {
            return "{\"success\": false, \"message\": \"Error deleting image: " + e.getMessage() + "\"}";
        } catch (Exception e) {
            return "{\"success\": false, \"message\": \"Error deleting item: " + e.getMessage() + "\"}";
        }
    }
}
