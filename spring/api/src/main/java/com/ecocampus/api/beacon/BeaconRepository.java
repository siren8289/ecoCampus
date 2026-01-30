package com.ecocampus.api.beacon;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BeaconRepository extends JpaRepository<Beacon, String> {
}
