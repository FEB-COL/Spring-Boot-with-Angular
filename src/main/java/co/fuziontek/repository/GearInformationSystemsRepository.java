package co.fuziontek.repository;

import co.fuziontek.domain.GearInformationSystems;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the GearInformationSystems entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearInformationSystemsRepository extends JpaRepository<GearInformationSystems, Long> {

    List<GearInformationSystems> findByGearOrganizationalUnit_Id(Long organizationalUnitId);

}
