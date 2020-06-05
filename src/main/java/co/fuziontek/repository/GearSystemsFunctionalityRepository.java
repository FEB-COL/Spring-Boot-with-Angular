package co.fuziontek.repository;

import co.fuziontek.domain.GearSystemsFunctionality;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearSystemsFunctionality entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearSystemsFunctionalityRepository extends JpaRepository<GearSystemsFunctionality, Long> {

}
