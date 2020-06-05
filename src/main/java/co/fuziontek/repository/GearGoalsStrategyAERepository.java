package co.fuziontek.repository;

import co.fuziontek.domain.GearGoalsStrategyAE;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the GearGoalsStrategyAE entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearGoalsStrategyAERepository extends JpaRepository<GearGoalsStrategyAE, Long> {

    List<GearGoalsStrategyAE> findByGearOrganizationalUnit_Id(Long organizationalUnitId);

}
