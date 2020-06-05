package co.fuziontek.repository;

import co.fuziontek.domain.GearProcessInfoSystem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearProcessInfoSystem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearProcessInfoSystemRepository extends JpaRepository<GearProcessInfoSystem, Long> {

}
