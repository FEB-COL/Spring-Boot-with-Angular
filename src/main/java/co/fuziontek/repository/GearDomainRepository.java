package co.fuziontek.repository;

import co.fuziontek.domain.GearDomain;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the GearDomain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearDomainRepository extends JpaRepository<GearDomain, Long> {

    List<GearDomain> findByGearOrganizationalUnit_Id(Long organizationalUnitId);
}
