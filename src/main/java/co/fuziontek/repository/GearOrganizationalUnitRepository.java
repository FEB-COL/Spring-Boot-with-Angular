package co.fuziontek.repository;

import co.fuziontek.domain.GearOrganizationalUnit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearOrganizationalUnit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearOrganizationalUnitRepository extends JpaRepository<GearOrganizationalUnit, Long> {

}
