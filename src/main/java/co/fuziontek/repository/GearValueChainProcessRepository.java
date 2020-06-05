package co.fuziontek.repository;

import co.fuziontek.domain.GearValueChainProcess;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearValueChainProcess entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearValueChainProcessRepository extends JpaRepository<GearValueChainProcess, Long> {

}
