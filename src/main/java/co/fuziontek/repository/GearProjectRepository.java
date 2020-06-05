package co.fuziontek.repository;

import co.fuziontek.domain.GearProject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the GearProject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearProjectRepository extends JpaRepository<GearProject, Long> {

    @Query(value = "select distinct gear_project from GearProject gear_project left join fetch gear_project.gearIterations",
        countQuery = "select count(distinct gear_project) from GearProject gear_project")
    Page<GearProject> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct gear_project from GearProject gear_project left join fetch gear_project.gearIterations")
    List<GearProject> findAllWithEagerRelationships();

    @Query("select gear_project from GearProject gear_project left join fetch gear_project.gearIterations where gear_project.id =:id")
    Optional<GearProject> findOneWithEagerRelationships(@Param("id") Long id);

}
