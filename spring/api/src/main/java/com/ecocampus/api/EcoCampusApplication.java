package com.ecocampus.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.ecocampus")
@EntityScan(basePackages = "com.ecocampus.api")
@EnableJpaRepositories(basePackages = "com.ecocampus.api")
public class EcoCampusApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcoCampusApplication.class, args);
    }
}
