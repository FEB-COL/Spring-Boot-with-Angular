package co.fuziontek.repository;

import co.fuziontek.domain.GearValueChainCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the GearValueChainCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearValueChainCategoryRepository extends JpaRepository<GearValueChainCategory, Long> {

    List<GearValueChainCategory> findByGearOrganizationalUnit_Id(Long organizationalUnitId);

}
