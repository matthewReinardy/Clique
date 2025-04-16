package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Ad;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.AdRepo;
import com.clique.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ads")
public class AdsController {

    @Autowired
    private AdRepo adRepo;

    @Autowired
    private UserRepo userRepo;

    // get all the ads
    @GetMapping
    public List<Ad> getAllAds() {
        return adRepo.findAll();
    }

    // get a single ad by id
    @GetMapping("/{id}")
    public Optional<Ad> getAd(@PathVariable long id) {
        return adRepo.findById(id);
    }

    // save new ad with image
    @PostMapping(value = "/save", consumes = "multipart/form-data")
    public ResponseEntity<?> saveAd(
            @RequestParam("display") boolean display,
            @RequestParam("isApproved") boolean isApproved,
            // these were the two big changes made, adding the image and ensuring each ad has a user reference
            @RequestParam(value = "file", required = false) MultipartFile imageFile,
            @RequestParam("userId") Long userId) {
        try {
            // ensure the user exists when posting an ad, otherwise error will throw
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            byte[] imageBytes = null;
            if (imageFile != null && !imageFile.isEmpty()) {
                imageBytes = imageFile.getBytes();
            }

            // create the ad
            Ad ad = new Ad();
            ad.setDisplay(display);
            ad.setIsApproved(isApproved);
            ad.setImage(imageBytes);
            ad.setUser(user);

            // save the ad into the database
            adRepo.save(ad);

            return ResponseEntity.ok(ad);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to process image: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

    // delete an ad
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAd(@PathVariable Long id) {
        try {
            Ad ad = adRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Ad not found"));
            adRepo.delete(ad);
            return ResponseEntity.ok("Ad deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Error: " + e.getMessage());
        }
    }
}
