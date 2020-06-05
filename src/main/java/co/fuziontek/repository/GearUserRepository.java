package co.fuziontek.repository;

import co.fuziontek.domain.GearUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the GearUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearUserRepository extends JpaRepository<GearUser, Long> {

    List<GearUser> findByGearOrganizationalUnit_Id(Long organizationalUnitId);

}
