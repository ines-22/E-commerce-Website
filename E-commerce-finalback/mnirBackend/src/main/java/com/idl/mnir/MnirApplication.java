package com.idl.mnir;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages="com.idl.mnir")
@SpringBootApplication
public class MnirApplication {

    public static void main(String[] args) {
        SpringApplication.run(MnirApplication.class, args);
    }

}
