package com.ecocampus.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.ecocampus")
@EntityScan(basePackages = "com.ecocampus")
@EnableJpaRepositories(basePackages = "com.ecocampus")
public class EcoCampusApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcoCampusApplication.class, args);
    }
}
