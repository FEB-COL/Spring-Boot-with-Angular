package co.fuziontek.repository;

import co.fuziontek.domain.GearSmartStrategyAE;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearSmartStrategyAE entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearSmartStrategyAERepository extends JpaRepository<GearSmartStrategyAE, Long> {

}
