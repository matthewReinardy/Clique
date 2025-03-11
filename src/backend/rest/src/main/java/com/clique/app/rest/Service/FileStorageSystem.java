package com.clique.app.rest.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;

@Service
public class FileStorageSystem {

    // Retrieving the file upload directory
    // In FileStorageSystem.java, modify this line:
    @Value("${file.upload-dir:./uploads}")
    private String uploadDir;

    // This method will save an uploaded file and returns the filename (dog.png)
    public String storeFile(MultipartFile file) throws IOException {

        // Creating a file object representing the upload directory that will store the users posts
        // This will probably be in the resources folder, but TBD
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = file.getOriginalFilename();
        if (fileName == null) {
            throw new IOException("File name is blank");
        }

        Path targetLocatinon = Paths.get(uploadDir).resolve(fileName);
        Files.copy(file.getInputStream(), targetLocatinon);

        return fileName;

    }
}
