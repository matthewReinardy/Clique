package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.Ad;
import com.clique.app.rest.Models.Post;
import com.clique.app.rest.Repo.AdRepo;
import java.util.List;
import java.util.Optional;

import com.clique.app.rest.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/ads")
public class AdsController {
    @Autowired
    private AdRepo adRepo;
    // get all the ads from the database
    @GetMapping
    public List<Ad> getAllAds() { return adRepo.findAll(); }
    // get an ad via ID
    @GetMapping("/{id}")
    public Optional<Ad> getAd(@PathVariable long id) { return adRepo.findById(id); }

    @PostMapping("/save")
    public Ad saveAd(@RequestBody Ad ad) {
        adRepo.save(ad);
        return ad;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAd(@PathVariable Long id) {
        try {
            // Find the ad we are deleting
            Ad ad = adRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Ad not found"));
            // If ad is found, delete it
            adRepo.delete(ad);
            return ResponseEntity.ok().body("Ad deleted successfully");
        } catch(RuntimeException e) {
            // If not return a 404
            return ResponseEntity.status(404).body("Error: " + e.getMessage());
        }
    }
}
