package com.clique.app.rest.Controller;

import com.clique.app.rest.Models.HelpCenterClaim;
import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.HelpCenterClaimRepo;
import com.clique.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/claims")
public class ClaimController {

    @Autowired
    private HelpCenterClaimRepo helpCenterClaimRepo;

    @Autowired
    private UserRepo userRepo;

    // get all claims
    @GetMapping
    public List<HelpCenterClaim> getAllClaims() {
        return helpCenterClaimRepo.findAll();
    }

    // get claim by ID
    @GetMapping("/{id}")
    public HelpCenterClaim getClaimById(@PathVariable Long id) {
        return helpCenterClaimRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found with ID: " + id));
    }

    // create a new claim
    @PostMapping("/save")
    public HelpCenterClaim createClaim(@RequestBody HelpCenterClaim claim) {
        // ensure user exists
        User user = userRepo.findById(claim.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + claim.getUser().getId()));

        // set initial status
        claim.setStatus(HelpCenterClaim.Status.OPEN);
        claim.setUser(user);
        return helpCenterClaimRepo.save(claim);
    }

    // update an existing claim
    @PutMapping("/update/{id}")
    public HelpCenterClaim updateClaim(@PathVariable Long id, @RequestBody HelpCenterClaim updatedClaim) {
        HelpCenterClaim claim = helpCenterClaimRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found with ID: " + id));

        claim.setDescription(updatedClaim.getDescription());
        claim.setIssueType(updatedClaim.getIssueType());
        claim.setStatus(updatedClaim.getStatus());

        return helpCenterClaimRepo.save(claim);
    }

    // delete a claim
    @DeleteMapping("delete/{id}")
    public String deleteClaim(@PathVariable Long id) {
        HelpCenterClaim claim = helpCenterClaimRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found with ID: " + id));

        helpCenterClaimRepo.delete(claim);
        return "Claim with ID " + id + " has been deleted.";
    }
}
