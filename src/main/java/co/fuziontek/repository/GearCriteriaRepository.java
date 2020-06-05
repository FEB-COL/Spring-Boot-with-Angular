package co.fuziontek.repository;

import co.fuziontek.domain.GearCriteria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearCriteria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearCriteriaRepository extends JpaRepository<GearCriteria, Long> {

}
