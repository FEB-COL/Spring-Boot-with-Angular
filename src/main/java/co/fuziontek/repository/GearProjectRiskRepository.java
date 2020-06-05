package co.fuziontek.repository;

import co.fuziontek.domain.GearProjectRisk;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearProjectRisk entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearProjectRiskRepository extends JpaRepository<GearProjectRisk, Long> {

}
