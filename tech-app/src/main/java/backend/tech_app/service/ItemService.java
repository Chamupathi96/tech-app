package backend.tech_app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.tech_app.model.ItemModel;
import backend.tech_app.repository.ItemRepository;

@Service
public class ItemService {
    
     private static String uploadDir = "tech-app/src/main/resources/static/uploads"; // Directory path

    @Autowired
    private ItemRepository itemRepository;

    // Add a new item
    public ItemModel addItem(ItemModel item) {
        return itemRepository.save(item);
    }

    // Get all items
    public List<ItemModel> getAllItems() {
        return itemRepository.findAll();
    }

    // Get item by ID
    public ItemModel getItemById(Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    // Delete item and its image
    public void deleteItem(Long id) throws IOException {
        // Find the item by ID
        ItemModel item = itemRepository.findById(id).orElse(null);
        if (item != null) {
            // Delete the image from the file system
            deleteImage(item.getImageUrl());

            // Delete the item from the database
            itemRepository.deleteById(id);
        }
    }

    // Method to delete the image from the uploads folder
    private void deleteImage(String imageUrl) throws IOException {
        // Convert the image URL to a file path
        Path imagePath = Paths.get(uploadDir, imageUrl.replace("/uploads/", ""));
        if (Files.exists(imagePath)) {
            Files.delete(imagePath); // Delete the file if it exists
        }
    }
}
