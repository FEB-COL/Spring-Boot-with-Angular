package co.fuziontek.repository;

import co.fuziontek.domain.GearAmbit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearAmbit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearAmbitRepository extends JpaRepository<GearAmbit, Long> {

}
