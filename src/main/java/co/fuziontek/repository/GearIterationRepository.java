package co.fuziontek.repository;

import co.fuziontek.domain.GearIteration;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearIteration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearIterationRepository extends JpaRepository<GearIteration, Long> {

}
