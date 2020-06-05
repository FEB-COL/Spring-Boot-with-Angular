package co.fuziontek.repository;

import co.fuziontek.domain.GearDecision;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearDecision entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearDecisionRepository extends JpaRepository<GearDecision, Long> {

}
